import * as Token from "./Token.json";
import * as NFT from "./Nft.json";
import { ContractABI } from "./contract-types";

const ERC20Token = Token as ContractABI;
const ERC721Nft = NFT as ContractABI;

export { ERC20Token, ERC721Nft };
