import { Mediator } from "../src/Mediator";
import { Command } from "../src/Command";
import { CommandHandler } from "../src/CommandHandler";

test("excution_success", async () => {
    class TestCommand extends Command<string> {
        public name: string = "Test command";
    }
    
    class TestCommandHandler extends CommandHandler<TestCommand, string> {
        public constructor() {
            super(TestCommand);
        }
    
        public handle(command: TestCommand): Promise<string> {
            return new Promise((resolve) => {
                resolve(`${command.name} has executed`);
            });
        }
    }
    
    let mediator = new Mediator([
        new TestCommandHandler()
    ]);
    
    let result = await mediator.execute(new TestCommand());
    
    expect(result).toEqual("Test command has executed");
});