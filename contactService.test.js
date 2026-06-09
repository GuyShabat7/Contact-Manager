const { executeCommand } = require("./services/contactService.js");

describe("Test executeCommand function", () => {
    test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "add",
            ["Dan Boni", "dan@example.com", "555-987-65223"]
        );

        expect(result).toEqual({ status: true, err: "" });
    });
    test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "add",
            ["Batshi Hadad", "bhadad@example.com", "555-911-63423"]
        );

        expect(result).toEqual({ status: true, err: "" });
    });
   test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "search",
            ["Dan"]
        );

        expect(result).toEqual({ status: true, err: "" });
    });
   test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "list",
            []
        );

        expect(result).toEqual({ status: true, err: "" });
    });
   test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "delete",
            ["Dan Boni"]
        );

        expect(result).toEqual({ status: true, err: "" });
    });
   test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "add",
            ["Dan Boni", "danxample.com", "555-987-65223"]
        );

        expect(result).toEqual({ status: false, err: "Email must contain @ symbol" });
    });
   test("should execute the correct command with the given arguments", () => {
        const result = executeCommand(
            "add",
            ["Batshi Hadad", "bhadad@example.com", "555-911-63423"]
        );

        expect(result).toEqual({ status: false, err: "Error: Contact with this email already exists" });
    });
});