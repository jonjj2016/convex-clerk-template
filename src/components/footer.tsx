import { Container } from '@/components/ui/container';

export function Footer() {
    return (
        <footer className="mt-auto border-t py-6 md:py-0">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Your Company
                        </span>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://twitter.com/yourusername"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Twitter
                        </a>
                    </nav>
                </div>
            </Container>
        </footer>
    );
}
