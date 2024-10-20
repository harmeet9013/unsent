import { connectDB } from "@/server/db";
import { CommonLayout } from "@/layouts";
import { SettingsProvider } from "@/settings";
import { primaryFont, ThemeProvider } from "@/theme";
import { GlobalContextProvider } from "@/contexts";

export const metadata = {
    title: "unsent",
    description: "did you find one?",
};

const intializeConnections = async () => {
    const response = await connectDB();

    return response?.status;
};

export default function RootLayout({ children }) {
    return intializeConnections() ? (
        <html lang="en">
            <body className={primaryFont.className}>
                <SettingsProvider>
                    <ThemeProvider>
                        <GlobalContextProvider>
                            <CommonLayout>{children}</CommonLayout>
                        </GlobalContextProvider>
                    </ThemeProvider>
                </SettingsProvider>
            </body>
        </html>
    ) : (
        <></>
    );
}
