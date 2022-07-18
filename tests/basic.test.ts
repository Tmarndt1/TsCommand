import { Mediator } from "../src/Mediator";
import { Command } from "../src/Command";
import { CommandHandler } from "../src/CommandHandler";

test("execution_success", async () => {
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


test("rejects_success", async () => {
    class TestCommand extends Command<string> {
        public name: string = "Test command";
    }

    expect(new Mediator([]).execute(new TestCommand()))
        .rejects.toBe("CommandHandler not found");
});

test("void_success", async () => {
    class TestCommand extends Command<void> {
        public name: string = "Test command";
    }
    
    class TestCommandHandler extends CommandHandler<TestCommand, void> {
        public constructor() {
            super(TestCommand);
        }
    
        public handle(): Promise<void> {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }
    
    let mediator = new Mediator([
        new TestCommandHandler()
    ]);
    
    let result = await mediator.execute(new TestCommand());
    
    expect(result).toEqual(undefined);
});