import {TMultiSig} from "@/types/MultiSig";
import {NextResponse} from "next/server";
import {exec} from 'child_process'

export async function POST(request: Request) {
    const req: TMultiSig = await request.json();
    if (t.filter((multiSig) => multiSig.address == req.address).length == 0) {
        console.log("Adding MultiSig", req)
        t.push(req);
        await exec(`cd ../hardhat-2.14 && npx hardhat verifyExistingMS --network tenderly --address ${req.address}`,
            function (err, stdout, stderr) {
                console.log(stdout)
                console.log(stderr)
            });
    } else {
        console.log("Already existing Multisig")
    }
    console.log("Verifying MultiSig at:", req.address)


    return NextResponse.json({message: "OK"});
}

const t: TMultiSig[] = [
    {
        name: 'najjaci',
        address: '0x13dA60f271c1b413790C07404C04c14424d90330',
        owners: [
          '0x13dA60f271c1b413790C07404C04c14424d90330',
          '0x4469880099472dDDFD357ab305AD2821D6E4647f',
          '0xE58b9ee93700A616b50509C8292977FA7a0f8ce1'
        ],
        signaturesRequired: 2
      },
      {
        name: 'fake',
        address: '0xE58b9ee93700A616b50509C8292977FA7a0f8ce1',
        owners: [
          '0x4469880099472dDDFD357ab305AD2821D6E4647f',
          '0x4d97fa219bD42f42740659CA77d14e67d9eEd7E4',
          '0xE58b9ee93700A616b50509C8292977FA7a0f8ce1'
        ],
        signaturesRequired: 2
      }
];

export async function GET() {
    return NextResponse.json(t);
}
