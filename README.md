
# What is 📦BoxedGHO ❓
BoxedGHO is a web5 application that helps its users to Covert GHO & send it across any chain into any token using the Box & Smart contract wallet integration. Also, you can buy GHO tokens from us using web2 payment. You may now buy GHO tokens from us via web2 payment. We are utilizing the African web2 payment service Flutterwave on the front end to collect fiat payments and sell GHO to users. read "How it works" for more info  (All onramp transactions were tested on Sepolia.) 

## Live Application

https://boxed-gho-eth-global-x-lfgho-hackathon.vercel.app/

# How it works 🏢⚒️

##  1. Sign In 🙋🏼

Certainly! In simple terms, 📦BoxedGHO is a platform where you can interact with GHO, which is an Aave stable coin, without needing a traditional wallet. Instead of using a separate cryptocurrency wallet, you can create your own wallet by signing in through popular web2 applications like Google, Discord, Twitter, and Facebook. Additionally, for authentication and authorization (AA), 📦BoxedGHO uses Connect Kit by Family and ZeroDev for AA creation. This simplifies the process for users to access and use GHO without the complexity of managing a dedicated digital wallet.


## 2. Top up their own or a friend's GHO balances with fiat using web2 payment gates. 💳
  
   We wanted to do a little experimenting here so we didn’t just make a simple faucet, we went a little deeper by making a contract in Solidity/Remix than can stake ETH on Aave and borrow GHO & linked African web2 payment provider Flutterwave on frontend to accept fiat payments sell GHO to the user at a small markup (Debt repaid when providers settle fiat payment). We wanted to take this a little further by doing an off-chain/on-chain proof of reserve for our GHO Top-Up 'facilitator' but time constraints held it back. (All onramp txns tested on Sepolia.)

- https://github.com/Tickether/BoxedGHO-ETHGlobal-x-LFGHO-hackathon/blob/main/contracts/FacilitateGHO.sol
- https://sepolia.etherscan.io/address/0x11dc650f09138b3f569a75fb9abac934a1c25e4d
- https://developer.flutterwave.com/docs/integration-guides/testing-helpers/

## 3. Swap and Bridge GHO into any token on any chain and to any recipient. 🔁

We got into the Box from Decent.xyz to help us achieve the key part of our build here, swap or swap & bridge GHO into any token on any chain and to any recipient. We use box-common, box-hooks & box-ui to get this job done since we want to build our custom widget. (All bridging txns tested on Mainnet.)

https://github.com/Tickether/BoxedGHO-ETHGlobal-x-LFGHO-hackathon/blob/main/app/boxContext.tsx
https://github.com/Tickether/BoxedGHO-ETHGlobal-x-LFGHO-hackathon/tree/main/components/boxComps
https://github.com/Tickether/BoxedGHO-ETHGlobal-x-LFGHO-hackathon/blob/main/components/send/SendToYourself.tsx



## 4. TEST SMART ACCOUNTS HISTORY 🕒
You can use the transaction Hashes from the links below on https://layerzeroscan.com/tx/<transactionHash> to see full bridge information including destination chain details:

https://etherscan.io/address/0x059a7a48b6e4962fcfada1df52ccdf056ad22708#internaltx
https://etherscan.io/address/0xab49b9bf6dde1ff993d33f0a454ac943babbaae1#internaltx
## How to Run it on local 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


