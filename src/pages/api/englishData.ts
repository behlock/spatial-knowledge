import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(
  req: any,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string): void; new (): any } } }
) {
  const jsonDirectory = path.join(process.cwd(), 'src', 'data')
  const fileContents = await fs.readFile(jsonDirectory + '/english.json', 'utf8')
  // Return the content of the data file in json format
  res.status(200).json(fileContents)
}
