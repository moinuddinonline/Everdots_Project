<?php
// Database credentials
$host = "localhost";
$dbname = "contact_form_db"; // Replace with your database name
$username = "root";          // Replace with your database username
$password = "";              // Replace with your database password

// Establish a connection to the database
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die("Database connection failed: " . $e->getMessage());
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and sanitize form inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone_number = htmlspecialchars(trim($_POST['phone_number']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate inputs
    if (empty($name) || empty($email) || empty($phone_number) || empty($message)) {
        http_response_code(400);
        die("All fields are required.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        die("Invalid email address.");
    }

    // Insert data into the database
    try {
        $sql = "INSERT INTO contacts (name, email, phone_number, message) VALUES (:name, :email, :phone_number, :message)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone_number', $phone_number);
        $stmt->bindParam(':message', $message);

        if ($stmt->execute()) {
            http_response_code(200);
            echo "Your message has been sent successfully.";
        } else {
            http_response_code(500);
            die("Failed to save data.");
        }
    } catch (PDOException $e) {
        http_response_code(500);
        die("Database error: " . $e->getMessage());
    }
} else {
    http_response_code(405);
    die("Method Not Allowed");
}
?>
