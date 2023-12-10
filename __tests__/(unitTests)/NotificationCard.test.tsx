import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationCard from "@/components/NotificationCard";

describe("NotificationCard component", () => {
  const notificationData = {
    body: "Test notification body",
    userId: "testUserId",
    createdAt: "2023-11-23T12:34:56Z",
    userName: "Test User",
  };

  it("renders notification card correctly", () => {
    render(
      <NotificationCard
        body={notificationData.body}
        userId={notificationData.userId}
        createdAt={notificationData.createdAt}
        userName={notificationData.userName}
      />
    );

    // Assert that the component renders the notification content
    expect(
      screen.getByText(new RegExp(notificationData.body))
    ).toBeInTheDocument();
    expect(screen.getByText(/12:34/)).toBeInTheDocument(); // Adjust the pattern as needed
    expect(
      screen.getByText(new RegExp(notificationData.userName))
    ).toBeInTheDocument();

    // Optionally, you can assert that the image is rendered
    const image = screen.getByAltText("");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fpexels-photo-2608582.jpeg&w=256&q=75"
    );
  });
});
