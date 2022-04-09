import {Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../core-sdk/network";
import {AccountsClient} from "./clients/accountsClient";
import {TransactionsClient} from "./clients/transactionsClient";


export class Explorer{
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;
    accountsClient: AccountsClient;
    transactionsClient: TransactionsClient;

    constructor(network: Network) {
        this.setNetwork(network);
        this.setClients();
    }

    setNetwork(network: Network): void {
        this.network = network;
    }

    setClients(): void {
        this.client = this.network.getClient();
        this.indexer = this.network.getIndexer();
        this.accountsClient = new AccountsClient(this.client, this.indexer);
        this.transactionsClient = new TransactionsClient(this.client, this.indexer);
    }
}