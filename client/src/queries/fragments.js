import { gql } from 'apollo-boost'

const clientShallowFragment = gql`
  fragment ClientShallowFragment on Client {
    id
    name
    address
    city
    postcode
    invoices {
      total
    }
  }
`
const clientFragment = gql `
  fragment ClientFragment on Client {
    id
    name
    address
    city
    postcode
    invoices {
      total
      items {
        id
      }
    }
  }
`

const invoiceFragment = gql`
  fragment InvoiceFragment on Invoice {
    id
    number
    date
    customer
    site
    email
    airmover
    labour
    cost
    createdAt
    updatedAt
    client {
      id
    }
    rows {
      items {
        id
      }
    }
  }
`

export {
  clientShallowFragment,
  clientFragment,
  invoiceFragment
}
