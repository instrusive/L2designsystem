import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";
import { CodeBlock } from "@/components/docs/code-block";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Motion",
  description: "Interactive feedback and overlay enter/exit: the two motion contexts in active use.",
};

export default function MotionPage() {
  return (
    <Prose className="max-w-4xl">
      <h1>Motion</h1>
      <p>
        Two distinct motion contexts, no others in active use: interactive feedback on
        controls, and overlay enter/exit. There&rsquo;s no page-transition or
        scroll-triggered animation system. This system doesn&rsquo;t reach for motion
        beyond what a control or overlay needs to feel responsive.
      </p>

      <h2>Interactive feedback</h2>
      <p>
        Hover and focus state changes (color, border, background) use Tailwind&rsquo;s
        default transition: <code>transition-colors</code> or <code>transition-all</code>,
        no explicit duration override, which resolves to Tailwind&rsquo;s 150ms default.
        Button additionally applies <code>active:translate-y-px</code> on press: a
        one-pixel nudge down, eased over that same default transition, meant to read as a
        physical press rather than a color change.
      </p>
      <div className="flex items-center gap-4 rounded-lg border border-dashed border-border bg-card p-6">
        <Button>Hover or press me</Button>
        <span className="text-xs text-muted-foreground">
          transition-all, default 150ms + active:translate-y-px
        </span>
      </div>

      <h2>Overlay enter/exit</h2>
      <p>
        Dialog, DropdownMenu, Select, Combobox, and Tooltip all animate in and out the
        same way, via <code>tw-animate-css</code>&rsquo;s <code>animate-in</code>/
        <code>animate-out</code> utilities, triggered off Base UI&rsquo;s{" "}
        <code>data-open</code>/<code>data-closed</code> state attributes:
      </p>
      <ul>
        <li>
          <code>duration-100</code>: 100ms, consistently, across every overlay. Fast
          enough to feel immediate, not so fast it feels like a glitch.
        </li>
        <li>
          <code>fade-in-0</code> / <code>fade-out-0</code>: every overlay fades.
        </li>
        <li>
          <code>zoom-in-95</code> / <code>zoom-out-95</code>: Dialog, DropdownMenu, and
          Select additionally scale in from 95%, reinforcing that the surface is
          emerging from (and retreating to) something rather than just appearing.
        </li>
        <li>
          DropdownMenu also slides in from the trigger&rsquo;s side (
          <code>data-[side=bottom]:slide-in-from-top-2</code>, and so on for each side) so
          it reads as anchored to what opened it, not just materializing nearby.
        </li>
      </ul>
      <p>
        No custom easing curve is set anywhere. Everything relies on the defaults that
        ship with Tailwind and <code>tw-animate-css</code>.
      </p>

      <h2>Usage</h2>
      <CodeBlock label="tsx">
        {`// Interactive control: default duration, no override needed
<button className="transition-colors hover:bg-secondary" />

// Overlay: consistent 100ms fade, matching every other overlay in the system
<div className="duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />`}
      </CodeBlock>

      <h2>Known gap</h2>
      <p>
        <code>prefers-reduced-motion</code> isn&rsquo;t handled anywhere yet. Overlay
        animations and the button press effect play unconditionally. Worth fixing before
        this becomes a real production dependency for more than one project.
      </p>
    </Prose>
  );
}
