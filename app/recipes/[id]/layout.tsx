export default function RecipeDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col items-center">{children}</div>;
}
