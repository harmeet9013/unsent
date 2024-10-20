import { connectDB } from "@/server";
import { CommonLayout } from "@/layouts";
import { SettingsProvider } from "@/settings";
import { GlobalContextProvider } from "@/contexts";
import { NotisSnackbarProvider } from "@/components";
import { primaryFont, ThemeProvider } from "@/theme";

export const metadata = {
    title: "things unsaid",
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
                        <NotisSnackbarProvider>
                            <GlobalContextProvider>
                                <CommonLayout>{children}</CommonLayout>
                            </GlobalContextProvider>
                        </NotisSnackbarProvider>
                    </ThemeProvider>
                </SettingsProvider>
            </body>
        </html>
    ) : (
        <></>
    );
}
