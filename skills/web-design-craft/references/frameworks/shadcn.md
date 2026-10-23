# shadcn/ui notes

- If the official shadcn skill is installed, defer CLI and component mechanics to it. This skill owns the visual direction and tokens.
- shadcn is unthemed by default; shipping its stock look is a cliche. Map DESIGN.md tokens onto its CSS variables in `globals.css`: `--background`, `--foreground`, `--card`, `--primary`, `--primary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--border`, `--ring`, `--radius`, and the chart variables.
- Set `--radius` deliberately; nested elements derive smaller radii.
- Use semantic classes (`text-destructive`, `bg-muted`), never absolute colors.
- Restyle the components you use (button sizes, input heights, focus ring) to match the type scale and density dial, rather than leaving defaults.
- Keep Radix accessibility intact: do not replace triggers with divs or remove focus management.
