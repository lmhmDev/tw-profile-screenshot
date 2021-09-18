import type { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'

import { firefox } from 'playwright'

type Data = {
  name: string | string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage();
  await page.goto(`https://twitter.com/${req.query.name}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `public/${req.query.name}.png` })
  res.status(200).json({ name: `${req.query.name}.png` })
}
