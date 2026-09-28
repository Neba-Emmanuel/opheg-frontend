import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateVolunteerValues, validateAttachmentMetadata, validateAttachmentContents } from '../src/lib/volunteerValidation.ts';
const valid = { name: 'Test Volunteer', email: 'test@example.org', phone: '+237 612345678', country: 'Cameroon', city: 'Buea', role: 'Outreach', status: 'Active', skills: 'Education', languages: 'English', availability: 'Weekends', workPreference: 'Both', gender: 'Female', department: 'OUTR', consent: true };
const enabled = values => Object.keys(validateVolunteerValues(values)).length === 0;
test('validity requires complete fields and explicit consent and reverses when changed', () => {
  assert.equal(enabled({}), false);
  assert.equal(enabled(valid), true);
  assert.equal(enabled({...valid, consent:false}), false);
  assert.equal(enabled({...valid, consent:'true'}), false);
  assert.equal(enabled({...valid, name:'   '}), false);
  assert.equal(enabled({...valid, email:'bad'}), false);
  assert.equal(enabled({...valid, gender:''}), false);
  assert.equal(enabled({...valid, department:'invalid'}), false);
  assert.equal(enabled({...valid, email:'corrected@example.org'}), true);
});
test('optional values must validate when present; emergency contacts are all or nothing', () => {
  for (const patch of [{phone:'-------'}, {phone:'1234567890123456'}, {joined:'2021'}, {dateOfBirth:'2025-02-30'}, {dateOfBirth:'2999-01-01'}, {portfolio:'javascript:alert(1)'}, {emergencyName:'Contact'}, {notes:'x'.repeat(1501)}]) assert.equal(enabled({...valid,...patch}), false);
  assert.equal(enabled({...valid,emergencyName:'Contact',emergencyRelationship:'Sibling',emergencyPhone:'+237 612345678'}), true);
});
test('attachments reject excess counts, empty, oversize, wrong extensions and combined size', () => {
  const pdf = { name:'cv.pdf', size:100 };
  for (const files of [[{...pdf,size:0}], [{...pdf,size:1048577}], [{...pdf,name:'cv.exe'}], [pdf,pdf,pdf,pdf], [pdf,pdf,pdf].map(file=>({...file,size:1048576}))]) assert.notEqual(Object.keys(validateAttachmentMetadata(null,files)).length,0);
  assert.deepEqual(validateAttachmentMetadata(null,[pdf]),{});
});
test('file content is checked before allowing submission', async () => {
  const pdf = new File(['%PDF-1.7\nexample'], 'cv.pdf');
  const fake = new File(['not a PDF'], 'cv.pdf');
  const photo = new File([new Uint8Array([137,80,78,71,13,10,26,10])], 'photo.png');
  assert.deepEqual(await validateAttachmentContents(photo,[pdf]),{});
  assert.ok((await validateAttachmentContents(null,[fake])).documents);
  assert.deepEqual(await validateAttachmentContents(null,[]),{});
});
