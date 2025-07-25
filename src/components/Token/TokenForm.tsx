import { useState } from "react";
import { TokenFormData, TokenMetadata } from "../../../types";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
//
import CreateToken from "@/app/create/page";
//


const initialFormData: TokenFormData = {
    name: "",
    symbol: "",
    decimals: 9,
    initialMintAmount: 100
}

const dummyTokenMetadata: TokenMetadata = {
    mint: "3kH9fZnYqDfPz3x5Qf8mK2fUyUxtjhgHb3Wq7N7s8X4A",
    mintAuthority: "B2cN8jTy5XQoQ9Bd7pWV7pJkqD8WRzF5j9p6bHqLn3k4",
    name: "DummyToken",
    symbol: "DMT",
    decimals: 6,
    initialMintAmount: 1000000,
};

function TokenForm() {
    const wallet = useWallet();
    const [formData, setFormData] = useState<TokenFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState("Launch Token");
    const [tokenData, setTokenData] = useState<TokenMetadata | null>(null);

    const handleInputChange = (
        field: keyof TokenFormData,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev, [field]: value
        }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const uploadImageFile = async () => {
        try {
            if (!file) {
                alert("File not selected");
                return
            }
            const data = new FormData();
            data.set("file", file, formData.name);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data
            })
            const imageUrl = await uploadRequest.json();
            setImageURL(imageUrl);
            return imageUrl
        } catch (error) {
            console.log(error);
            alert("Trouble uploading file");
        }
    }

    const uploadMetaData = async (metadata: object) => {
        try {
            const metaDataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
            const metaDataFormData = new FormData();
            metaDataFormData.set(
                "file",
                metaDataBlob,
                `metaData-${formData.name}.json`
            );
            const response = await fetch("/api/files", {
                method: "POST",
                body: metaDataFormData
            })
            if (!response.ok) throw new Error("Failed to upload metadata");
            alert("Metadata uploaded successfully!");
            const metaDataUrl = await response.json();
            console.log("metadatauri", metaDataUrl);
        } catch (error) {
            console.log(error);
            alert("Trouble uploading metadata");
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { connection } = useConnection()
            if (wallet?.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey)
                const balanceSOL = balance / 1e9;
                if (balance < 0.01) {
                    alert("Insufficient balance, transactions might fail, please request an airdrop")
                }
                setLoading(false);
                return;
            }
            setLoadingText("Uploading metadata files...");
            const imageURL = await uploadImageFile();
            if (imageURL) {
                const metaData = {
                    name: formData.name,
                    symbol: formData.symbol,
                    imageURL
                }
                const metaDataURI = await uploadMetaData(metaData);
                console.log("Metadata URI just before createtoken:", metaDataURI);
                setLoadingText("Creating token...")
                const result = await CreateToken(formData, metaDataURI, wallet);
                setLoadingText("storing in db...")
                const response = await fetch("/api/tokenMints", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: result.mint }),
                })
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setTokenData(data);
                alert("token created successfully")
            }
        } catch (error) {
            console.error("Error creating token:", error);
        } finally {
            setLoading(false);
        }
    }

}
