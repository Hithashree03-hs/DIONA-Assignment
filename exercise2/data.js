/* =====================================================================
   Exercise 2 — datasets (scenarios).

   The form is driven entirely by this data: which checkboxes are
   ticked, every date / name / comment, the pain rating, and the
   declaration checkmarks. Empty strings render as blank underlines,
   `null` on a select-one group means "nothing ticked" — exactly like
   a partially filled paper form.

     - sample     : mirrors the sample PDF exactly (3 pages)
     - recovering : a worker still off work, in active treatment
     - detailed   : long comments everywhere to demonstrate that the
                    content re-paginates onto extra pages
   ===================================================================== */

const EX2_DATASETS = {

  sample: {
    meta: {
      workerName: "Madeleine Willson",
      claimNo: "20042047",
      workerAppId: "712041",
      submitted: "2024-03-19T19:21"
    },
    returnToWork: {
      status: "returned",              /* notMissed | notReturned | returned */
      returnedDate: "2024-03-15",
      working: "modified-reduced",     /* full-regular | full-reduced | modified-regular | modified-reduced | other | null */
      otherText: "",
      goingComment: "Terrible. Testing Testing",
      expectedReturnDate: "",
      concerns: "",
      contactName: "",
      contactDate: ""
    },
    recovery: {
      fullyRecovered: true,            /* true | false | null */
      comments: "",
      painRating: null,                /* 1-10 | null */
      receivingTreatment: null,        /* true | false | null */
      providerType: "",
      lastTreatment: { date: "", name: "" },
      nextTreatment: { date: "", name: "" },
      frequency: "",
      takingMedication: null,
      medicationName: "",
      doingExercises: null,
      exerciseList: ""
    },
    otherInfo: "No info Testing Testing",
    declarations: { certify: true, privacy: true }
  },

  recovering: {
    meta: {
      workerName: "Daniel Okafor",
      claimNo: "20091448",
      workerAppId: "778102",
      submitted: "2025-04-02T08:47"
    },
    returnToWork: {
      status: "notReturned",
      returnedDate: "",
      working: null,
      otherText: "",
      goingComment: "",
      expectedReturnDate: "2025-04-21",
      concerns: "My role requires repeated overhead lifting and I am worried about re-injuring my shoulder if modified duties are not available when I return.",
      contactName: "Priya Sharma (HR Manager)",
      contactDate: "2025-03-28"
    },
    recovery: {
      fullyRecovered: false,
      comments: "Physiotherapy is helping. Shoulder mobility has improved by roughly 60%, but overhead movement is still painful.",
      painRating: 6,
      receivingTreatment: true,
      providerType: "Physiotherapist",
      lastTreatment: { date: "2025-03-31", name: "Motion Rehab Clinic" },
      nextTreatment: { date: "2025-04-07", name: "Motion Rehab Clinic" },
      frequency: "Twice a week",
      takingMedication: true,
      medicationName: "Naproxen 500mg",
      doingExercises: true,
      exerciseList: "Pendulum swings, wall slides, and resistance-band external rotations — 3 sets of 10, twice daily."
    },
    otherInfo: "I have submitted my parking and travel receipts separately under the Medical & Travel Expense Request form.",
    declarations: { certify: true, privacy: true }
  },

  detailed: {
    meta: {
      workerName: "Emily Tremblay",
      claimNo: "20112307",
      workerAppId: "911560",
      submitted: "2025-08-14T16:32"
    },
    returnToWork: {
      status: "notMissed",
      returnedDate: "",
      working: "other",
      otherText: "Gradual return plan — 4 hours on-site, 4 hours remote",
      goingComment: "The gradual return plan is working well overall. Mornings on-site are manageable, although by early afternoon my lower back begins to stiffen and I need to alternate between sitting and standing.\nMy supervisor has been accommodating with break times and my workstation was adjusted by the ergonomics team on August 5.",
      expectedReturnDate: "2025-09-15",
      concerns: "My main concern is the warehouse audit season starting in September, which normally involves long periods of standing and repeated bending. I would like to confirm whether my modified duties will continue through that period, and whether a sit-stand stool can be provided on the audit floor before full duties resume.",
      contactName: "Marc Lefebvre (Operations Supervisor)",
      contactDate: "2025-08-11"
    },
    recovery: {
      fullyRecovered: false,
      comments: "Recovery has been steady but slower than expected. The first month showed rapid improvement, but progress has plateaued in the last two weeks.\nMy physiotherapist believes this is normal for a disc-related strain and has adjusted my program to add core stabilization work. Sleep has improved and I no longer need pain medication at night.",
      painRating: 3,
      receivingTreatment: true,
      providerType: "Physiotherapist and Chiropractor",
      lastTreatment: { date: "2025-08-12", name: "Prairie Spine & Sport Clinic" },
      nextTreatment: { date: "2025-08-19", name: "Prairie Spine & Sport Clinic" },
      frequency: "Once a week, moving to bi-weekly in September",
      takingMedication: true,
      medicationName: "Ibuprofen 400mg (as needed)",
      doingExercises: true,
      exerciseList: "Daily program prescribed on August 5:\nBird-dog holds — 3 sets of 8 each side.\nGlute bridges — 3 sets of 12.\nMcGill curl-ups — 3 sets of 8.\nCat-camel mobility — 2 minutes morning and evening.\nWalking — 30 minutes at lunch, 5 days a week."
    },
    otherInfo: "I want to note that my recovery has been supported very well by my employer. The ergonomic assessment on August 5 resulted in a height-adjustable desk and a lumbar support chair.\nI have also enrolled in the WCB-recommended back-care workshop scheduled for August 28 and will forward the completion certificate once received.",
    declarations: { certify: true, privacy: true }
  }
};
