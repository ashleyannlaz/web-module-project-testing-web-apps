import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, "Emma")
    const error = screen.queryByText(/firstName must have at least 5 characters/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button")
    userEvent.click(button)
    const error = screen.queryByText(/Name must have at least 5 characters/i);
    expect(error).toBeInTheDocument();
    const error2 = screen.queryByText(/lastName is a required field/i);
    expect(error2).toBeInTheDocument();
    const error3 = screen.queryByText(/email must be a valid email address/i);
    expect(error3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, "Ashley")
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, "Ferrer")
    const button = screen.getByRole("button")
    userEvent.click(button)
    const error3 = screen.queryByText(/email must be a valid email address/i);
    expect(error3).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailName = screen.getByLabelText(/email/i)
    userEvent.type(emailName, "emma")
    const error3 = screen.queryByText(/email must be a valid email address/i);
    expect(error3).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button")
    userEvent.click(button)
    const error = screen.queryByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstInput, "Ashley");

    const lastInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastInput, "Ferrer");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "cristopherlaz@gmail.com");

    const button = screen.getByRole('button');
    userEvent.click(button);

    const nameDisplay = screen.getByTestId("firstnameDisplay")
    const lastNameDisplay = screen.getByTestId("lastnameDisplay")
    const emailDisplay = screen.getByTestId("emailDisplay")
    expect(nameDisplay).toBeVisible();
    expect(lastNameDisplay).toBeVisible();
    expect(emailDisplay).toBeVisible();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstInput, "Ashley");

    const lastInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastInput, "Ferrer");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "cristopherlaz@gmail.com");

    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "cool story bro");

    const button = screen.getByRole('button');
    userEvent.click(button);
 
    const nameTest = await screen.findByTestId("firstnameDisplay");
    expect(nameTest).toBeVisible();
    const lastTest = await screen.findByTestId("lastnameDisplay");
    expect(lastTest).toBeVisible();
    const emailTest = await screen.findByTestId("emailDisplay");
    expect(emailTest).toBeVisible();
    const messageTest = await screen.findByTestId("messageDisplay");
    expect(messageTest).toBeVisible();
    

});