# TsCommand
Typescript command pattern library

## Example

Create different Commands and CommandHandlers. Register the CommandHandlers through a Mediator and execute a Command against the Medaitor which will redirect the call to the appropriate CommandHandler. 

```typescript

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

mediator.execute(new TestCommand());

```
