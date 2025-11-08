import type { Job } from "bullmq";

import axios from "axios";

import { DI } from "../main";
import config from "../config";
import { error } from "console";
import { IDeal, IParsedResponse } from "./types/parser.types";
import { writeFileSync } from "fs";

export const forceStart = async (job: Job<any, any>) => {
  const result = await startParsing();
  DI.parserQueue.addJob("done_parsing", result);
};

export const startParsing = async () => {
  try {
    const steps = {
      contacts: "api/v4/contacts",
      statuses: "api/v4/leads/pipelines/10263418/statuses",
      dealById: "api/v4/leads/",
      catalogElements: "api/v2/catalog_elements",
      lossReasons: "api/v4/leads/loss_reasons",
    };

    const contactsRequest = axios.get(
      `${config.external.crm.baseUrl}${steps.contacts}`,
      {
        headers: {
          Authorization: `Bearer ${config.external.crm.token}`,
          "Content-Type": "application/json",
        },
        params: {
          with: "leads",
        },
      }
    );

    const statusesRequest = axios.get(
      `${config.external.crm.baseUrl}${steps.statuses}`,
      {
        headers: {
          Authorization: `Bearer ${config.external.crm.token}`,
          "Content-Type": "application/json",
        },
        params: {
          with: "leads",
        },
      }
    );

    const catalogElementsRequest = axios.get(
      `${config.external.crm.baseUrl}${steps.catalogElements}`,
      {
        headers: {
          Authorization: `Bearer ${config.external.crm.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const lossReasonsRequest = axios.get(
      `${config.external.crm.baseUrl}${steps.lossReasons}`,
      {
        headers: {
          Authorization: `Bearer ${config.external.crm.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const [contacts, statuses, catalogElements, lossReasons] =
      await Promise.all([
        contactsRequest,
        statusesRequest,
        catalogElementsRequest,
        lossReasonsRequest,
      ]).catch((error) => {
        throw error;
      });

    if (
      contacts.status !== 200 ||
      statuses.status !== 200 ||
      catalogElements.status !== 200 ||
      lossReasons.status !== 200
    ) {
      throw error;
    }

    const resultCols: IParsedResponse[] = [];

    // console.log(contacts.data._embedded.contacts[0].custom_fields_values);

    for (const contact of contacts.data._embedded.contacts) {
      const result = {} as IParsedResponse;
      result.client_id = contact.id;
      result.name = contact.name;
      result.created_at = contact.created_at;
      result.updated_at = contact.updated_at;
      result.deals = [];
      contact.custom_fields_values.map((field) => {
        if (field.field_code === "PHONE")
          result.phone_number = field.values[0].value;
        if (field.field_code === "EMAIL") result.email = field.values[0].value;
      });
      const leads = contact._embedded.leads.map((lead) => lead.id ?? "");
      for (let i = 0; i < leads.length; i++) {
        const deal = await axios.get(
          `${config.external.crm.baseUrl}${steps.dealById}${leads[i]}`,
          {
            headers: {
              Authorization: `Bearer ${config.external.crm.token}`,
              "Content-Type": "application/json",
            },
            params: {
              with: "catalog_elements",
            },
          }
        );

        if (deal.status !== 200) throw new Error(deal.statusText);
        const clearedDeal = {
          name: deal.data.name,
          price: deal.data.price,
          closed_at: deal.data.closed_at,
          created_at: deal.data.created_at,
          updated_at: deal.data.updated_at,
          lossReason:
            lossReasons.data._embedded.loss_reasons.find(
              (lossReason) => lossReason.id === deal.data.loss_reason_id
            )?.name || null,
          status:
            statuses.data._embedded.statuses.find(
              (status) => status.id === deal.data.status_id
            )?.name || null,
          items: [],
        } as IDeal;

        for (const catalogElement of catalogElements.data._embedded.items) {
          for (const dealId of catalogElement.leads.id) {
            if (dealId === deal.data.id) {
              clearedDeal.items.push({
                name: catalogElement.name,
                price: +catalogElement.custom_fields.find(
                  (item) => item.code === "PRICE"
                ).values[0].value,
              });
            }
          }
        }

        result.deals.push(clearedDeal);
      }
      resultCols.push(result);
    }

    console.log(resultCols[0].deals[1].items);
    // const result = {
    //   name: "TEst",
    //   deals: [{ price: 123124, name: "deal1" }],
    // } as IParsedResponse;
    // DI.parserQueue.addJob("parser_done", resultCols);
  } catch (error) {
    console.error(error);
  }
};
