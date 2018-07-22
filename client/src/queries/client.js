import { gql } from 'apollo-boost'

import {
  invoiceFragment,
  clientFragment,
  clientShallowFragment
} from './fragments'

const FETCH_ALL_CLIENTS = gql`
  query fetchAllClients($first: Int!, $skip: Int) {
    clients(first: $first, skip: $skip) {
      total
      items {
        ...ClientShallowFragment
      }
    }
  }
  ${clientShallowFragment}
`

const FETCH_SINGLE_CLIENT = gql`
  query fetchSingleClient ($clientId: ID!) {
    client(id: $clientId) {
      ...ClientFragment
    }
  }
  ${clientFragment}
`

const FETCH_CLIENT_INVOICES = gql`
  query fetchClientInvoices ($clientId: ID!) {
    client(id: $clientId) {
      id
      invoices {
        total
        items {
          ...InvoiceFragment
        }
      }
    }
  }
  ${invoiceFragment}
`

const CREATE_CLIENT = gql`
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      ...ClientShallowFragment
    }
  }
  ${clientShallowFragment}
`

const UPDATE_CLIENT = gql`
  mutation updateClient($input: UpdateClientInput!) {
    updateClient(input: $input) {
      ...ClientShallowFragment
    }
  }
  ${clientShallowFragment}
`

const DESTROY_CLIENT = gql`
  mutation DestroyClient($input: DestroyClientInput!) {
    destroyClient(input: $input)
  }
`

export {
  clientShallowFragment,
  clientFragment,
  
  FETCH_ALL_CLIENTS,
  FETCH_SINGLE_CLIENT,
  FETCH_CLIENT_INVOICES,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  DESTROY_CLIENT,
}
