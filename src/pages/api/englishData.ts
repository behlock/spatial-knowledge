import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(
  req: any,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string): void; new (): any } } }
) {
  const jsonDirectory = path.join(process.cwd(), 'src', 'data')
  const fileContents = await fs.readFile(jsonDirectory + '/english-nodes.json', 'utf8')
  res.status(200).json(fileContents)
}
