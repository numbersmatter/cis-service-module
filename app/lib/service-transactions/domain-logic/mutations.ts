import { ServiceTransaction } from "../types/service-trans-model";
import { serviceTransactionsDb } from "../service-transactions-crud.server";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";

const addSchema = z.object({});

// export const recordServiceMutation= makeDomainFunction(addSchema)
// ( async (
//     values
//   ) => {
//   const transaction: ServiceTransaction = {

//   };

//   const docId = await serviceTransactionsDb.create();
//   return docId;
//   }
// );
