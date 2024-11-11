/* eslint-disable no-undef */
describe("Register and login a client", () => {
  const randomName = "Name" + Math.random().toString(36).substring(7);
  const randomLastName = "LastName" + Math.random().toString(36).substring(7);
  const randomIdentification = Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString();
  const randomTel = Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString();
  it("Register an user", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#registerPage-button").click();
    cy.get("#registerInputFirstName").type(randomName);
    cy.get("#registerInputLastName").type(randomLastName);
    cy.get("#registerInputId").type(randomIdentification);
    cy.get("#registerInputTel").type(randomTel);
    cy.get("#registerInputEmail").type(`${randomName}@gmail.com`);
    cy.get("#registerInputPass").type("123");
    cy.get(".registerPage-form-button").click();
    cy.url().should("include", "/profile");
  });

  it("Register an user", () => {
    cy.visit("http://localhost:5173/login");
    cy.get(".loginPage-form-input.user-mode > input").type(
      `${randomName}@gmail.com`
    );
    cy.get(".loginPage-form > :nth-child(3) > input").type("123");
    cy.get(".loginPage-form-button").click();
    cy.url().should("include", "/profile");
  });
});
