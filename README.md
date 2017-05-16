# Swagger

This repository would be used to integrate with ReDoc for API documentation.

## Update specs config

Install [node.js](https://nodejs.org/en/)

Run the following commands from the terminal:

    npm run update

## Repo structure    

Here is the high level view of the repo structure :

```
`Bitbucket
 |
 | -- Swagger
       |-- Payments
             |
             |-- PaymentEcommerce
                     |
                     | -- Version1
                            | -- PaymentEcommerce.json
                     | -- Version2
                            | -- PaymentEcommerce.json
             |
             |-- PaymentCNPSale
                     |
                     | -- Version1
                            | -- PaymentCNPSale.json
                     | -- Version2
                            | -- PaymentCNPSale.json

       |-- Credit & Financing
             |
             |-- Credit
                     |
                     | -- Version1
                            | -- Credit.json
                     | -- Version2
                            | -- Credit.json
             |
             |-- Loan
                     |
                     | -- Version1
                            | -- Loan.json
                     | -- Version2
                            | -- Loan.json`
```       
