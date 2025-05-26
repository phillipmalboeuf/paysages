import { PREVIEW } from '$env/static/private'
import { createClient } from 'contentful'

const preview = PREVIEW
export const content = createClient({
  space: 'zus8zhcz0nkl',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'HjBy9AUTk83h4OiW_iErVQhKj67I7R8-7wVVVdtQnTs' : 'bD-n1cfvmQ55MK_b7zFmjotngyi87iUAN5F1NiLuyw8',
}).withoutUnresolvableLinks