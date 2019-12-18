require('jest');
const cmd = require('./cmd');

// api will reject duplicate files, so need to make sure file is deleted
afterAll(async () => {
  try{
    await cmd.execute(['--delete', '--name', '_test_file']);
    await cmd.execute(['--delete', '--name', '_test_file2']);
  } catch {}
});

// make sure cli is linked
describe('Cli is linked', () => {
  it('If this fails, run npm link', async () => {
    try{
      await cmd.execute([]);
      expect(true).toBe(true);
    } catch (err) {
      expect(err).toBe('foo')
    }
  });
})

// make sure server is running for these tests to work
describe('Remote file server testing', () => {
  
  it('Uploads, lists, and deletes a file by calling cli command', async () => {

    // test file upload
    let commandArgs = ['--upload', '--path', '_test_file2'];
    let cases = [
      /_test_file2/,
      /1 Files are uploaded/,
    ];
    const upload_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(upload_response).toMatch(expected)
    }

    // test listing file
    commandArgs = ['--list']
    cases = [
      /_test_file2/,
    ]
    const list_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(list_response).toMatch(expected)
    }

    // test deleting file
    commandArgs = ['--delete', '--name', '_test_file2']
    cases = [
      /_test_file2/,
      /ok/,
    ]
    const delete_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(delete_response).toMatch(expected)
    }

    // list no longer contains deleted file
    commandArgs = ['--list']
    const list_response2 = await cmd.execute(commandArgs);
    expect(list_response2).not.toMatch('_test_file2')
  })
})

describe('Local file server testing', () => {
  
  it('Uploads, lists, and deletes a file by calling cli command', async () => {

    // test file upload
    let commandArgs = ['--local_upload', '--path', '_test_file']
    let cases = [
      /_test_file/,
      /Successfully added/,
    ]
    const upload_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(upload_response).toMatch(expected)
    }

    // test listing file
    commandArgs = ['--local_list']
    cases = [
      /_test_file/,
    ]
    const list_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(list_response).toMatch(expected)
    }

    // test deleting file
    commandArgs = ['--local_delete', '--name', '_test_file']
    cases = [
      /removed _test_file/,
    ]
    const delete_response = await cmd.execute(commandArgs);
    for (let expected of cases) {
      expect(delete_response).toMatch(expected)
    }

    // list no longer contains deleted file
    commandArgs = ['--local_list']
    const list_response2 = await cmd.execute(commandArgs);
    expect(list_response2).not.toMatch('_test_file')
  })
})