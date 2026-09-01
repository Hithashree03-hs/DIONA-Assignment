/* =====================================================================
   Exercise 1 — datasets.

   Everything the document shows comes from here: claimant name, claim
   number, Worker App ID, submitted timestamp, and every table row.
   Sections with no rows are omitted from the generated document, and
   the page count / page numbers adapt automatically.

     - standard : mirrors the sample PDF exactly (2 pages)
     - minimal  : only two sections have data (fits on 1 page)
     - extended : many rows in every section (tables split across
                  3-4 pages with repeated headers)
   ===================================================================== */

const EX1_DATASETS = {

  standard: {
    meta: {
      workerName: "Madeleine Willson",
      claimNo: "20042047",
      workerAppId: "712041",
      submitted: "2024-03-28T20:43"
    },
    privacyAcknowledged: true,
    prescriptionDrugs: [
      { drug: "Naproxen", prescriptionDate: "2024-02-28", datePurchased: "2024-02-29", provider: "Dr. Best", amount: 20 }
    ],
    otcDrugs: [
      { drug: "Advil", datePurchased: "2024-03-28", amount: 8, seller: "Shoppers Drug Mart", reason: "Pain" }
    ],
    medicalSupplies: [
      { item: "Tensor", datePurchased: "2024-02-28", prescribed: "Yes", provider: "Dr. Best", amount: 10, seller: "Shoppers Drug Mart" }
    ],
    parking: [
      { address: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada", date: "2024-03-28", amount: 10, meterUsed: "Yes", meterNumber: "12245" }
    ],
    mileage: [
      { date: "2024-03-28", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplace: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: 20 }
    ],
    fares: [
      { date: "2024-03-28", start: "", provider: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada", mode: "Bus", amount: 3 },
      { date: "2024-03-27", start: "25 Furby St, Winnipeg MB R3C2A2, Canada", provider: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", mode: "Taxi", amount: 15 }
    ]
  },

  minimal: {
    meta: {
      workerName: "Arjun Mehta",
      claimNo: "20077113",
      workerAppId: "845220",
      submitted: "2025-01-12T09:15"
    },
    privacyAcknowledged: true,
    prescriptionDrugs: [
      { drug: "Ibuprofen 600mg", prescriptionDate: "2025-01-05", datePurchased: "2025-01-06", provider: "Dr. Osei", amount: 16.4 }
    ],
    otcDrugs: [],
    medicalSupplies: [],
    parking: [
      { address: "409 Tache Ave, Winnipeg MB R2H 2A6, Canada", date: "2025-01-06", amount: 5, meterUsed: "Yes", meterNumber: "30412" }
    ],
    mileage: [],
    fares: []
  },

  extended: {
    meta: {
      workerName: "Sofia Alvarez",
      claimNo: "20105590",
      workerAppId: "903311",
      submitted: "2025-06-30T17:05"
    },
    privacyAcknowledged: true,
    prescriptionDrugs: [
      { drug: "Naproxen 500mg", prescriptionDate: "2025-05-02", datePurchased: "2025-05-03", provider: "Dr. Patel", amount: 22.5 },
      { drug: "Cyclobenzaprine 10mg", prescriptionDate: "2025-05-02", datePurchased: "2025-05-03", provider: "Dr. Patel", amount: 18.75 },
      { drug: "Tramadol 50mg", prescriptionDate: "2025-05-16", datePurchased: "2025-05-16", provider: "Dr. Patel", amount: 31.2 },
      { drug: "Diclofenac Gel 1%", prescriptionDate: "2025-05-30", datePurchased: "2025-05-31", provider: "Dr. Nguyen", amount: 27.99 },
      { drug: "Naproxen 500mg (refill)", prescriptionDate: "2025-06-06", datePurchased: "2025-06-07", provider: "Dr. Patel", amount: 22.5 },
      { drug: "Pantoprazole 40mg", prescriptionDate: "2025-06-06", datePurchased: "2025-06-07", provider: "Dr. Patel", amount: 14.6 },
      { drug: "Tramadol 50mg (refill)", prescriptionDate: "2025-06-20", datePurchased: "2025-06-20", provider: "Dr. Nguyen", amount: 31.2 }
    ],
    otcDrugs: [
      { drug: "Advil Extra Strength", datePurchased: "2025-05-04", amount: 12.49, seller: "Shoppers Drug Mart", reason: "Pain" },
      { drug: "Tylenol Muscle Aches", datePurchased: "2025-05-11", amount: 10.99, seller: "Rexall", reason: "Muscle pain" },
      { drug: "Robaxacet", datePurchased: "2025-05-18", amount: 13.79, seller: "Walmart Pharmacy", reason: "Back spasms" },
      { drug: "Aleve", datePurchased: "2025-06-01", amount: 11.29, seller: "Shoppers Drug Mart", reason: "Inflammation" },
      { drug: "Voltaren Emulgel", datePurchased: "2025-06-15", amount: 16.99, seller: "London Drugs", reason: "Joint pain" }
    ],
    medicalSupplies: [
      { item: "Tensor bandage", datePurchased: "2025-05-04", prescribed: "Yes", provider: "Dr. Patel", amount: 9.99, seller: "Shoppers Drug Mart" },
      { item: "Wrist brace", datePurchased: "2025-05-10", prescribed: "Yes", provider: "Dr. Patel", amount: 34.5, seller: "Rexall" },
      { item: "Lumbar support belt", datePurchased: "2025-05-22", prescribed: "No", provider: "", amount: 42, seller: "Walmart" },
      { item: "Reusable cold compress", datePurchased: "2025-06-02", prescribed: "No", provider: "", amount: 12.5, seller: "Amazon.ca" },
      { item: "Kinesiology tape", datePurchased: "2025-06-14", prescribed: "Yes", provider: "Dr. Nguyen", amount: 15.25, seller: "SportChek" }
    ],
    parking: [
      { address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", date: "2025-05-03", amount: 8.5, meterUsed: "Yes", meterNumber: "10981" },
      { address: "675 McDermot Ave, Winnipeg MB R3E 0V9, Canada", date: "2025-05-10", amount: 6, meterUsed: "Yes", meterNumber: "22347" },
      { address: "1 Morley Ave, Winnipeg MB R3L 2P4, Canada", date: "2025-05-17", amount: 10, meterUsed: "No", meterNumber: "" },
      { address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", date: "2025-05-31", amount: 8.5, meterUsed: "Yes", meterNumber: "10981" },
      { address: "233 Kennedy St, Winnipeg MB R3C 3J5, Canada", date: "2025-06-07", amount: 12, meterUsed: "No", meterNumber: "" },
      { address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", date: "2025-06-21", amount: 8.5, meterUsed: "Yes", meterNumber: "10981" }
    ],
    mileage: [
      { date: "2025-05-03", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 18 },
      { date: "2025-05-10", provider: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB R3M 3E4, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 22 },
      { date: "2025-05-17", provider: "Riverview Health Centre, 1 Morley Ave, Winnipeg MB R3L 2P4, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 16 },
      { date: "2025-05-31", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 18 },
      { date: "2025-06-07", provider: "Motion Rehab Clinic, 233 Kennedy St, Winnipeg MB R3C 3J5, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 14 },
      { date: "2025-06-14", provider: "Concordia Hospital, 1095 Concordia Ave, Winnipeg MB R2K 3S8, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 26 },
      { date: "2025-06-21", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplace: "145 Portage Ave E, Winnipeg MB R3B 0Y3, Canada", km: 18 }
    ],
    fares: [
      { date: "2025-05-03", start: "199 Garry St, Winnipeg MB R3C 1G8, Canada", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", mode: "Bus", amount: 3.25 },
      { date: "2025-05-10", start: "199 Garry St, Winnipeg MB R3C 1G8, Canada", provider: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB R3M 3E4, Canada", mode: "Taxi", amount: 21.4 },
      { date: "2025-05-17", start: "", provider: "Riverview Health Centre, 1 Morley Ave, Winnipeg MB R3L 2P4, Canada", mode: "Bus", amount: 3.25 },
      { date: "2025-05-24", start: "199 Garry St, Winnipeg MB R3C 1G8, Canada", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", mode: "Bus", amount: 3.25 },
      { date: "2025-05-31", start: "199 Garry St, Winnipeg MB R3C 1G8, Canada", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", mode: "Taxi", amount: 18.75 },
      { date: "2025-06-07", start: "", provider: "Motion Rehab Clinic, 233 Kennedy St, Winnipeg MB R3C 3J5, Canada", mode: "Bus", amount: 3.25 },
      { date: "2025-06-14", start: "199 Garry St, Winnipeg MB R3C 1G8, Canada", provider: "Concordia Hospital, 1095 Concordia Ave, Winnipeg MB R2K 3S8, Canada", mode: "Taxi", amount: 24.1 },
      { date: "2025-06-21", start: "", provider: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", mode: "Bus", amount: 3.25 }
    ]
  }
};
