import type { Job } from "bullmq";

import axios from "axios";

import { DI } from "../main";
import config from "../config";
import { error } from "console";
import { IDeals, IParsedResponse } from "./types/parser.types";

export const forceStart = async (job: Job<any, any>) => {
  const result = await startParsing();
  DI.parserQueue.addJob("done_parsing", result);
};

export const startParsing = async () => {
  try {
    // const steps = {
    //   contacts: "api/v4/contacts",
    //   statuses: "api/v4/leads/pipelines/10263418/statuses",
    //   dealById: "api/v4/leads/",
    //   itemById: "api/v2/catalog_elements",
    // };

    // const contactsRequest = axios.get(
    //   `${config.external.crm.baseUrl}${steps[0]}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${config.external.crm.token}`,
    //       "Content-Type": "application/json",
    //     },
    //     params: {
    //       with: "leads",
    //     },
    //   }
    // );

    // const statusesRequest = axios.get(
    //   `${config.external.crm.baseUrl}${steps[1]}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${config.external.crm.token}`,
    //       "Content-Type": "application/json",
    //     },
    //     params: {
    //       with: "leads",
    //     },
    //   }
    // );

    // const [contacts, statuses] = await Promise.all([
    //   contactsRequest,
    //   statusesRequest,
    // ]).catch((error) => {
    //   throw error;
    // });

    // if (contacts.status !== 200 || statuses.status !== 200) {
    //   throw error;
    // }

    // const result = {} as IParsedResponse;

    // for (const contact of contacts.data._embedded.contacts) {
    //   result.client_id = contact.id;
    //   result.name = contact.name;
    //   result.created_at = contact.created_at;
    //   result.updated_at = contact.updated_at;
    //   contact.custom_fields_values.map((field) => {
    //     if (field.field_code === "PHONE")
    //       result.phone_number = field.values.values[0].value;
    //     if (field.field_code === "EMAIL")
    //       result.email = field.values.values[0].value;
    //   });
    //   const leads = contact._embedded.leads.map((lead) => lead.id ?? "");
    //   const dealsList: IDeals[] = [];
    //   for (let i = 0; i < leads.lenght; i++) {
    //     const deals = await axios.get(
    //       `${config.external.crm.baseUrl}${steps[2]}${leads[i]}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${config.external.crm.token}`,
    //           "Content-Type": "application/json",
    //         },
    //         params: {
    //           with: "catalog_elements",
    //         },
    //       }
    //     );

    //     if (deals.status !== 200) throw new Error(deals.statusText);
    //   }
    // }
    const result = {
      name: "TEst",
      deals: [{ price: 123124, name: "deal1" }],
    } as IParsedResponse;
    DI.parserQueue.addJob("parser_done", result);
  } catch (error) {
    console.error(error);
  }
};
