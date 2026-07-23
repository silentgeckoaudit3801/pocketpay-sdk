# Stellar Testnet Account Funding

PocketPay SDK Testnet examples use Stellar accounts, and a newly generated
keypair is not visible on-chain until it receives its first XLM deposit. Use
this guide when a wallet has a public key but Horizon still reports that the
account does not exist.

## Account Activation

- `createWallet()` creates a local keypair only; it does not submit anything to
  Stellar and does not activate the account.
- An account becomes active after it receives the Stellar minimum balance.
- On Testnet, Friendbot can fund a public key with test XLM for free.
- On Mainnet, do not use Friendbot; a real funded account or exchange transfer
  must create the account instead.

## Funding With the SDK

```typescript
import { createWallet, fundTestnetAccount, getBalance } from "@axionvera/pocketpay-sdk";

const wallet = createWallet();

const funding = await fundTestnetAccount(wallet.publicKey);
if (!funding.success) {
  throw new Error(funding.error ?? "Friendbot funding failed");
}

const balance = await getBalance(wallet.publicKey);
console.log(balance.nativeBalance);
```

Only pass the public key to Friendbot. Never send or log `wallet.secretKey` when
funding a Testnet account.

## Confirming Activation

After `fundTestnetAccount` succeeds, confirm the account by calling
`getBalance(publicKey)` and checking that the native XLM balance is present. You
can also verify the returned funding transaction hash in a Stellar Testnet
explorer or Horizon response.

## Common Failure Cases

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `ACCOUNT_NOT_FOUND` from `getBalance` | The keypair exists locally but has not received Testnet XLM yet | Call `fundTestnetAccount(publicKey)` and retry after the funding transaction is accepted |
| Payment fails because destination is missing | A standard Stellar payment cannot create an unfunded destination account | Fund the destination account first on Testnet |
| Friendbot returns `429` | Friendbot throttled the IP address or target account | Wait before retrying and avoid tight funding loops in tests |
| Public key validation fails | The value is not a Stellar public key or has extra whitespace | Trim input and ensure it starts with `G` |
| Funding works locally but not in CI | CI may share IP limits or block outbound Testnet calls | Keep unit tests offline and reserve Friendbot calls for integration tests |

## Test Guidance

Use mocked funding responses in unit tests. Friendbot and Horizon calls should
stay in integration tests because they depend on public Testnet availability and
rate limits.

See also:

- [Getting Started](./getting-started.md#3-testnet-funding)
- [Network Error Handling](./network-errors.md)
- [Testing](./testing.md)