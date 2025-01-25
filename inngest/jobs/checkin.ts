// import { db } from "@/database/drizzle";
import { inngestClient } from ".."
// import { users } from "@/database/schema";

// export const checkin = inngestClient.createFunction(
//   { id: "send-checkin-email" },
//   { event: "app/checkin" },
//   async ({ event, step }) => {
//     await step.sleep("wait-a-moment", "1s");
//     return { message: `Hello ${event.data.name}! How are you doing!` };
//   },
// );
export const checkin = inngestClient.createFunction(
  { id: "batch-daily-checkup" },
  // refer crontab.guru for correct expression
  { cron: "* * * * *" }, // This cron expression schedules the function every minutes
  // { cron: "1 * * * *" }, // This cron expression schedules the function to run daily at midnight
  async ({ step }) => {
    // get the users
    // const userList = await step.run("fetch-users", async () => {
    //   const userData = await db.select().from(users);
    //   return userData;
    // });
    const userList: any[] = [
      { email: "mrnisch@gmail.com", fullName: "nischal puri" },
      { email: "bisal@gmail.com", fullName: "bisal thapa" },
      { email: "nikes@gmail.com", fullName: "nikes papa" },
    ]

    // Your function logic here
    const events = userList.map((user) => ({
      name: "app/send.daily.digest",
      data: {
        email: user.email,
        name: user.fullName.split(" ")[0],
      },
    }))
    await step.sendEvent("send-daily-events", events)

    // This function can now quickly finish and the rest of the logic will
    // be handled in the function below ⬇️
  }
)

// This is a regular Inngest function that will send the actual email for
// every event that is received (see the above function's inngest.send())

// Since we are "fanning out" with events, these functions can all run in parallel
export const sendWeeklyDigest = inngestClient.createFunction(
  { id: "send-daily-digest-email" },
  { event: "app/send.daily.digest" },
  async ({ event }) => {
    // 3️⃣ We can now grab the email and user id from the event payload
    const { email, name } = event.data

    // 4️⃣ Finally, we send the email itself:
    // await email.send("weekly_digest", email, user_id);
    return { message: `Hello ${name}! how are you doing` }

    // 🎇 That's it! - We've used two functions to reliably perform a scheduled
    // task for a large list of users!
  }
)
