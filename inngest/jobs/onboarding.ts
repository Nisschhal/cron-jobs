import { inngestClient } from "..";

export const onboarding = inngestClient.createFunction(
  { id: "send-welcome-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.name}! Welcome` };
  },
);

// import { sendWelcomeEmail } from "@/lib/mails";

// export const onboarding = inngestClient.createFunction(
//   { id: "send-welcome-email" },
//   { event: "app/user.created" },
//   async ({ event, step }) => {
//     const user = event.data;
//     await step.run("send-email", async () => {
//       // Implement your email sending logic, e.g., using an email service
//       // await sendWelcomeEmail(user.email, html);
//     });
//   },
// );
