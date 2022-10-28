import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Signup } from "./Signup";

test('in the initial render, error message div does not come up', async () => {
    render(<Signup />)
    const container = document.querySelector('.signup-comments');
    expect(container.style.display).not.toBe('none')
});

test('form submission is not allowed when some fields are left empty', () => {
    render(<Signup />)
    userEvent.type(screen.getByPlaceholderText(/last name/i), 'Singh')
    userEvent.type(screen.getByPlaceholderText(/email address/i), 'sid@sid.com')
    userEvent.type(screen.getByPlaceholderText('Password'), '12Qwaszx!')
    userEvent.type(screen.getByPlaceholderText(/confirm password/i), '12Qwaszx!')
    userEvent.click(screen.getByRole('submit-btn'))

    const submitBtn = document.querySelector('.submit-btn');
    expect(submitBtn.classList.contains('invalid-input')).toBe(true)
});

test('form submission is only allowed when all fields are entered', () => {
    render(<Signup />)
    userEvent.type(screen.getByPlaceholderText(/first name/i), 'Sid')
    userEvent.type(screen.getByPlaceholderText(/last name/i), 'Singh')
    userEvent.type(screen.getByPlaceholderText(/email address/i), 'sid@sid.com')
    userEvent.type(screen.getByPlaceholderText('Password'), '12Qwaszx!')
    userEvent.type(screen.getByPlaceholderText(/confirm password/i), '12Qwaszx!')
    userEvent.click(screen.getByRole('submit-btn'))

    const submitBtn = document.querySelector('.submit-btn');
    expect(submitBtn.classList.contains('invalid-input')).toBe(false)
});

