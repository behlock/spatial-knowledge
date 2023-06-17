import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(
  _req: any,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string): void; new (): any } } }
) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'src', 'data')
  // Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/arabic-nodes.json', 'utf8')
  // Return the content of the data file in json format
  res.status(200).json(fileContents)
}
