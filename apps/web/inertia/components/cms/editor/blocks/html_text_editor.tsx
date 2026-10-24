import { type SharedProps } from '@adonisjs/inertia/types';
import { usePage } from '@inertiajs/react';
import { LEGAL_VARIABLE_KEYS, type LegalVariableKey } from '#cms/types/legal_variables';
import { LFW } from '~/components/cms/editor/locked_file_wrapper';
import { EditorProps } from '~/components/cms/types/builder';

export function HtmlTextEditor(props: EditorProps) {
	const { block, onChange, lockProps } = props;

	const p = block.props as any;
	const u = (k: string, v: any) => onChange({ ...p, [k]: v });

	const pageProps = usePage<SharedProps>().props;
	const identity = pageProps.legal_identity;

	/**
	 * Inserts a `{{legal.<key>}}` token at the textarea caret. The textarea is
	 * uncontrolled, so the DOM value is updated first and the builder state is
	 * synced right after — keeping the two in lockstep.
	 */
	function insertVariable(key: LegalVariableKey) {
		const token = `{{legal.${key}}}`;
		const el = document.querySelector<HTMLTextAreaElement>('textarea[name="content"]');

		if (el) {
			const start = el.selectionStart ?? el.value.length;
			const end = el.selectionEnd ?? start;
			const next = el.value.slice(0, start) + token + el.value.slice(end);
			el.value = next;
			el.focus();
			el.setSelectionRange(start + token.length, start + token.length);
			u('content', next);
			return;
		}

		const current = p.content ?? '';
		u('content', current + (current && !current.endsWith(' ') ? ' ' : '') + token);
	}

	return (
		<div className="space-y-3">
			<LFW
				{...lockProps}
				fieldKey="content"
				type="textarea"
				label="Text"
				defaultValue={p.content ?? ''}
				onChange={(v) => u('content', v)}
			/>
			<div className="grid gap-1.5">
				<span className="text-[10px] font-bold uppercase tracking-widest text-ink-subtle">Variables</span>
				<div className="flex flex-wrap gap-1.5">
					{LEGAL_VARIABLE_KEYS.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => insertVariable(key)}
							className="group flex items-center gap-1.5 text-[11px] border border-edge rounded-md bg-canvas px-2 py-1 transition-colors hover:border-primary-mid"
							title={`Insert {{legal.${key}}}${identity[key] ? ` — ${identity[key]}` : ' — not set'}`}
						>
							<code className="text-ink-muted group-hover:text-primary-mid transition-colors">
								{`{{legal.${key}}}`}
							</code>
							<span className="text-ink-subtle max-w-28 truncate">{identity[key] ?? 'not set'}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
