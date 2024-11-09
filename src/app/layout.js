import { CommonLayout } from "@/layouts";
import { SettingsProvider } from "@/settings";
import { GlobalContextProvider } from "@/contexts";
import { NotisSnackbarProvider } from "@/components";
import { primaryFont, ThemeProvider } from "@/theme";

export const metadata = {
    title: "things unsaid",
    description: "did you find one?",
};

export default async function RootLayout({ children }) {
    return (
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
    );
}
