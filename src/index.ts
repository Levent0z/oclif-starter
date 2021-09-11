import { Command, flags } from '@oclif/command'

class OclifStarter extends Command {
  static description = 'A template command to demonstrate OCLIF usage.';

  // https://oclif.io/docs/args
  // static args = [{ name: 'file' }]; // Positional arguments
  // static strict = false; // For variable number of arguments

  // https://oclif.io/docs/flags
  static flags = {
    version: flags.version(),
    help: flags.help({ char: 'h' }),
    single: flags.string({
      char: 's',
      description: 'A single argument'
    }),
    multi: flags.string({
      char: 'm',
      description: 'An argument that can be repeated',
      multiple: true
    }),
    dependent: flags.string({
      char: 'd',
      description: "An arg that's dependent on the single argument and excludes the multi argument",
      dependsOn: ['single'],
      exclusive: ['multi']
    }),
    'env-arg': flags.string({
      char: 'e',
      description: 'An argument that will override the value provided in the env variable "MY_CLI_ENV_ARG".',
      env: 'MY_CLI_ENV_ARG'
    }),
    boolean: flags.boolean({
      description: 'A boolean argument'
    }),
    error: flags.boolean({
      description: 'A boolean argument that logs an error'
    })
  };

  async run() {
    const { args, flags } = this.parse(OclifStarter)
    let hasArgs = false;

    if (flags.single) {
      this.log(`Single arg has value ${flags.single}`);
      hasArgs = true;
    }

    const multi: string[] = flags.multi;
    if (multi) {
      this.log(`Multi arg has values [${multi.join(', ')}]`);
      hasArgs = true;
    }

    if (flags.dependent) {
      this.log(`Dependent arg has value ${flags.dependent}`);
      hasArgs = true;
    }

    if (flags['env-arg']) {
      this.log(`"env-arg" arg has value ${flags['env-arg']}`);
      hasArgs = true;
    }

    if (flags['boolean']) {
      this.log(`The boolean has value ${flags['boolean']}`);
      hasArgs = true;
    }

    if (flags['error']) {
      this.error(`The error arg was used. Exiting.`, { exit: 1 });
    }

    if (!hasArgs) {
      await OclifStarter.run(['--help']);
    }
  }
}

export = OclifStarter
