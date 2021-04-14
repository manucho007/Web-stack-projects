import { MessageService } from "./message.service";

describe("Message Service", () => {
  let service: MessageService;

  it("Should have no messages to start", () => {
    service = new MessageService();
    expect(service.messages.length).toBe(0);
  });
  it("Should have a message when add is called", () => {
    service = new MessageService();
    service.add("message1");
    expect(service.messages.length).toBe(1);
  });
  it("Should remove all the messages when clear is called", () => {
    //   Arrange
    service = new MessageService();
    service.add("message1");
    // Act
    service.clear();
    // Assert
    expect(service.messages.length).toBe(0);
  });
});
