// TEST

// tests/Login.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Login from "../index";
import LoginForm from "../LoginForm";

describe("Login", () => {
  it("renders headline"),
    () => {
      render(<Login />);
      const headline = screen.getByText(/Login Page/i);
      expect(headline).toBeInTheDocument();
    };
});

test("LoginForm renders correctly", () => {
  render(<LoginForm />);

  // Assuming your form has labels, you can test for their presence
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

// test("LoginForm handles input changes", () => {
//   render(<LoginForm />);

//   // Assuming your form has input fields with test attributes
//   const usernameInput = screen.getByLabelText(/username/i);
//   const passwordInput = screen.getByLabelText(/password/i);

//   fireEvent.change(usernameInput, { target: { value: "testuser" } });
//   fireEvent.change(passwordInput, { target: { value: "testpassword" } });

//   expect(usernameInput.value).toBe("testuser");
//   expect(passwordInput.value).toBe("testpassword");
// });

// Add more tests based on your specific requirements
