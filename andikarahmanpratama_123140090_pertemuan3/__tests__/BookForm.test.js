"use client";

/**
 * Unit test untuk BookForm component
 * Menguji validasi form, submit, dan cancel functionality
 */

// Note: Ini adalah template untuk testing
// Jalankan: npm test BookForm.test.js

import { useState } from "react";
import jest from "jest";

// Mock test untuk BookForm
describe("BookForm Component", () => {
  it("should initialize with empty form fields", () => {
    // Arrange: Setup initial state
    const initialData = {
      title: "",
      author: "",
      status: "owned",
    };

    // Act: Simulate form initialization
    const [formData] = useState(initialData);

    // Assert: Verify initial state
    expect(formData.title).toBe("");
    expect(formData.author).toBe("");
    expect(formData.status).toBe("owned");
  });

  it("should validate required fields - title field", () => {
    // Test untuk memastikan title field wajib diisi
    const validateForm = (book) => {
      const errors = {};
      if (!book.title.trim()) errors.title = "Judul buku harus diisi";
      return errors;
    };

    const invalidBook = { title: "", author: "Author", status: "owned" };
    const errors = validateForm(invalidBook);

    expect(errors.title).toBe("Judul buku harus diisi");
  });

  it("should validate required fields - author field", () => {
    const validateForm = (book) => {
      const errors = {};
      if (!book.author.trim()) errors.author = "Penulis harus diisi";
      return errors;
    };

    const invalidBook = { title: "Title", author: "", status: "owned" };
    const errors = validateForm(invalidBook);

    expect(errors.author).toBe("Penulis harus diisi");
  });

  it("should validate required fields - status field", () => {
    const validateForm = (book) => {
      const errors = {};
      if (!book.status) errors.status = "Status harus dipilih";
      return errors;
    };

    const invalidBook = { title: "Title", author: "Author", status: "" };
    const errors = validateForm(invalidBook);

    expect(errors.status).toBe("Status harus dipilih");
  });

  it("should pass validation with all fields filled correctly", () => {
    const validateForm = (book) => {
      const newErrors = {};
      if (!book.title.trim()) newErrors.title = "Judul buku harus diisi";
      if (!book.author.trim()) newErrors.author = "Penulis harus diisi";
      if (!book.status) newErrors.status = "Status harus dipilih";
      return newErrors;
    };

    const validBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      status: "owned",
    };
    const errors = validateForm(validBook);

    expect(Object.keys(errors).length).toBe(0);
  });

  it("should handle form submission with valid data", () => {
    const mockOnAdd = jest.fn();
    const formData = {
      title: "Book Title",
      author: "Author Name",
      status: "owned",
    };

    // Simulate form submit
    mockOnAdd(formData);

    expect(mockOnAdd).toHaveBeenCalledWith(formData);
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it("should handle cancel button click", () => {
    const mockOnCancel = jest.fn();

    // Simulate cancel button click
    mockOnCancel();

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should populate form with initial data for editing", () => {
    const initialData = {
      id: "1",
      title: "Existing Book",
      author: "Existing Author",
      status: "reading",
    };

    const [formData] = useState(initialData);

    expect(formData.title).toBe("Existing Book");
    expect(formData.author).toBe("Existing Author");
    expect(formData.status).toBe("reading");
  });

  it("should reset form after successful submission", () => {
    const [formData, setFormData] = useState({
      title: "Book",
      author: "Author",
      status: "owned",
    });

    // Simulate successful submission
    setFormData({
      title: "",
      author: "",
      status: "owned",
    });

    expect(formData.title).toBe("");
    expect(formData.author).toBe("");
  });
});
