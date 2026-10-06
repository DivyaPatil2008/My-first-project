package src;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.io.File;
import java.nio.file.Files;
import java.net.InetSocketAddress;

public class LibraryServer {

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
            new InetSocketAddress(8080),
            0
        );

        server.createContext("/", LibraryServer::home);
        server.createContext("/login", LibraryServer::login);

        server.setExecutor(null);
        server.start();

        System.out.println("Library Server started!");
        System.out.println("Open: http://localhost:8080/login.html");
    }

    private static void home(HttpExchange exchange)
            throws IOException {

        File file = new File("frontend/login.html");

        if (!file.exists()) {
            sendResponse(exchange, "login.html not found!");
            return;
        }

        byte[] content = Files.readAllBytes(file.toPath());

        exchange.getResponseHeaders().set(
            "Content-Type",
            "text/html"
        );

        exchange.sendResponseHeaders(200, content.length);

        OutputStream output = exchange.getResponseBody();
        output.write(content);
        output.close();
    }

    private static void login(HttpExchange exchange)
        throws IOException {

    String username = "admin";
    String password = "admin123";
    String role = "ADMIN";

    boolean result =
        LoginServer.login(username, password, role);

    if (result) {
        sendResponse(exchange, "Login successful!");
    } else {
        sendResponse(exchange, "Login failed!");
    }
}

    private static void sendResponse(
            HttpExchange exchange,
            String response)
            throws IOException {

        byte[] data = response.getBytes();

        exchange.sendResponseHeaders(200, data.length);

        OutputStream output = exchange.getResponseBody();
        output.write(data);
        output.close();
    }
}