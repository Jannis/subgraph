import { getContractAddresses, getOptions, getOrgName, getWeb3, sendQuery } from './util';

describe('ContractsInfo', () => {
  let web3;
  let addresses;
  let avatar;
  const orgName = getOrgName();

  beforeAll(async () => {
    addresses = getContractAddresses();
  });

  it('Sanity', async () => {
    const { avatarContracts } = await sendQuery(`{
      avatarContracts {
        id
        address
        name
        nativeToken
        nativeReputation
        balance
        owner
      }
    }`, 3000);

    expect(avatarContracts).toContainEqual({
      id: addresses.Avatar.toLowerCase(),
      address: addresses.Avatar.toLowerCase(),
      name: orgName,
      nativeToken: addresses.NativeToken.toLowerCase(),
      nativeReputation: addresses.NativeReputation.toLowerCase(),
      balance: `${Number(balance) + 1}`,
      owner: addresses.Controller.toLowerCase(),
    });
  }, 20000);
});
