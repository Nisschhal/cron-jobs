import { Body, Button, Html, Tailwind } from "@react-email/components"
import * as React from "react"

export default function Email() {
  return (
    <Html>
      <Body>
        <Tailwind>
          <Button
            className="bg-black"
            href="https://example.com"
            // style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
          >
            Click me
          </Button>
        </Tailwind>
      </Body>
    </Html>
  )
}
