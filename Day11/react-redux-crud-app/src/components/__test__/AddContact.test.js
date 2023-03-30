import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import AddContact from "../AddContact";
import { Provider } from "react-redux";
import store from "../../saga/store";
import { toast } from "react-toastify";
import { LocationDisplay } from "../../App";

const MockAddContact = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AddContact />
      </BrowserRouter>
    </Provider>
  );
};

toast.success = jest.fn();

describe("Add Contact Component", () => {

  it("Checking Form Route", async () => {
    const route = "/add";

    render(
      <MemoryRouter initialEntries={[route]}>
        <LocationDisplay />
      </MemoryRouter>
    );
    await expect(screen.getByTestId("location-display")).toHaveTextContent(route);
  });


  it("Add Contact Header Testing", async () => {
    render(<MockAddContact />);
    const headerElement = await screen.findByRole("heading");
    await expect(headerElement).toBeInTheDocument();
  });


  it("Rendering Input Element ", async () => {
    render(<MockAddContact />);
    const inputElement = await screen.findByPlaceholderText(/name/i);
    await expect(inputElement).toBeInTheDocument();
  });


  it("Able to type in Input Element", async () => {
    render(<MockAddContact />);
    const nameElement = await screen.findByPlaceholderText(/name/i);
    const emailElement = await screen.findByPlaceholderText(/email/i);
    const contactElement = await screen.findByPlaceholderText(/contact/i);
    await fireEvent.click(nameElement);
    await fireEvent.click(emailElement);
    await fireEvent.click(contactElement);
    await fireEvent.change(nameElement, { target: { value: "Bhushan" } });
    await fireEvent.change(emailElement, { target: { value: "bhushan@gmail.com" } });
    await fireEvent.change(contactElement, { target: { value: 8329458132 } });
    await expect(nameElement.value).toBe("Bhushan");
    await expect(emailElement.value).toBe("bhushan@gmail.com");
    await expect(contactElement.value).toBe("8329458132");
  });
 

  it("Form submit and navigate back to another route.", async () => {
    const route = "/";

    render(<MockAddContact />);

    const submitButtonElement = await screen.findByRole("button");
    await fireEvent.click(submitButtonElement);

    render(
      <MemoryRouter initialEntries={[route]}>
        <LocationDisplay />
      </MemoryRouter>
    );

    await expect(screen.getByTestId("location-display")).toHaveTextContent(route);
  });
});
