import { store } from '@graphprotocol/graph-ts';

// Import event types from the Reputation contract ABI
import {
  GenericScheme,
  NewCallProposal,
  ProposalExecuted,
} from '../../types/GenericScheme/GenericScheme';

import * as domain from '../../domain';

// Import entity types generated from the GraphQL schema
import {
  GenericSchemeProposal,
} from '../../types/schema';

function insertNewProposal(event: NewCallProposal): void {
  let gs = GenericScheme.bind(event.address);
  let ent = new GenericSchemeProposal(event.params._proposalId.toHex());
  ent.dao = event.params._avatar.toHex();
  ent.contractToCall = gs.getContractToCall(event.params._avatar);
  ent.callData = event.params._callData;
  ent.value = event.params._value;
  ent.executed = false;

  store.set('GenericSchemeProposal', event.params._proposalId.toHex(), ent);
}

export function handleNewCallProposal(
  event: NewCallProposal,
): void {
  domain.handleNewCallProposal(event);

  insertNewProposal(event);
}

export function handleProposalExecuted(
  event: ProposalExecuted,
): void {
  let ent = store.get('GenericSchemeProposal', event.params._proposalId.toHex()) as GenericSchemeProposal;
  if (ent != null) {
    ent.executed = true;
    ent.returnValue = event.params._genericCallReturnValue;
  }

  store.set('GenericSchemeProposal', event.params._proposalId.toHex(), ent);
}
