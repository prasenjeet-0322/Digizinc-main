'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Transition } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
	heading: string;
	description?: string;
}

export function PricingSection({
	plans,
	heading,
	description,
	...props
}: PricingSectionProps) {
	const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
		'monthly',
	);

	return (
		<div
			className={cn(
				'flex w-full flex-col items-start md:items-center justify-center space-y-5 p-4',
				props.className,
			)}
			{...props}
		>
			<div className="w-full md:mx-auto max-w-3xl space-y-4 pb-8">
				<p className="text-left md:text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Pricing</p>
				<h2 className="text-left md:text-center font-['Inter'] text-3xl font-bold text-white md:text-5xl">
					{heading}
				</h2>
				{description && (
					<p className="text-zinc-400 text-left md:text-center text-sm md:text-lg leading-relaxed">
						{description}
					</p>
				)}
			</div>
			<PricingFrequencyToggle
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
				{plans.map((plan) => (
					<PricingCard plan={plan} key={plan.name} frequency={frequency} />
				))}
			</div>
		</div>
	);
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
	frequency,
	setFrequency,
	...props
}: PricingFrequencyToggleProps) {
	return (
		<div
			className={cn(
				'bg-transparent/40 md:bg-transparent border-white/10 mx-auto flex w-fit rounded-full border p-1',
				props.className,
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					key={freq}
					onClick={() => setFrequency(freq)}
					className="relative px-6 py-2 text-sm capitalize text-cream font-bold"
				>
					<span className="relative z-10">{freq}</span>
					{frequency === freq && (
						<motion.span
							layoutId="frequency"
							transition={{ type: 'spring', duration: 0.4 }}
							className="bg-[#F23030] absolute inset-0 z-0 rounded-full"
						/>
					)}
				</button>
			))}
		</div>
	);
}

type PricingCardProps = React.ComponentProps<'div'> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = frequencies[0],
	...props
}: PricingCardProps) {
	return (
		<div
			className={cn(
				'relative flex w-full flex-col rounded-2xl border-0 md:border',
				plan.highlighted ? 'md:border-[#F23030]/50' : 'md:border-white/10',
				className,
			)}
			{...props}
		>
			{plan.highlighted && (
				<BorderTrail
					style={{
						boxShadow:
							'0px 0px 60px 30px rgb(242 48 48 / 30%), 0 0 100px 60px rgb(242 48 48 / 30%), 0 0 140px 90px rgb(166 31 31 / 30%)',
					}}
					size={100}
				/>
			)}
			<div
				className={cn(
					'bg-black/40 rounded-t-2xl md:border-b md:border-white/10 p-8',
					plan.highlighted && 'bg-[#A61F1F]/10',
				)}
			>
				<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
					{plan.highlighted && (
						<p className="bg-[#F23030] text-white flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider">
							<StarIcon className="h-3 w-3 fill-current" />
							Popular
						</p>
					)}
					{frequency === 'yearly' && (
						<p className="bg-emerald-600 text-white flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider">
							{Math.round(
								((plan.price.monthly * 12 - plan.price.yearly) /
									plan.price.monthly /
									12) *
									100,
							)}
							% off
						</p>
					)}
				</div>

				<div className="font-['Inter'] text-2xl font-bold text-cream">{plan.name}</div>
				<p className="text-zinc-400 text-sm font-medium mt-1">{plan.info}</p>
				<h3 className="mt-6 flex items-end gap-1">
					<span className="font-['Inter'] text-5xl font-black text-white">${plan.price[frequency]}</span>
					<span className="text-zinc-500 font-bold mb-1">
						{plan.name !== 'Free'
							? '/' + (frequency === 'monthly' ? 'mo' : 'yr')
							: ''}
					</span>
				</h3>
			</div>
			<div
				className={cn(
					'text-zinc-300 space-y-4 px-8 py-8 text-sm flex-1 bg-black/20',
					plan.highlighted && 'bg-[#A61F1F]/5',
				)}
			>
				{plan.features.map((feature, index) => (
					<div key={index} className="flex flex-start gap-3">
						<CheckCircleIcon className="text-[#F23030] h-5 w-5 shrink-0 mt-0.5" />
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											"leading-relaxed",
											feature.tooltip &&
												'cursor-help border-b border-dashed border-zinc-500',
										)}
									>
										{feature.text}
									</p>
								</TooltipTrigger>
								{feature.tooltip && (
									<TooltipContent className="bg-zinc-900 border-white/10 text-cream">
										<p>{feature.tooltip}</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				))}
			</div>
			<div
				className={cn(
					'mt-auto w-full md:border-t md:border-white/10 p-6 rounded-b-2xl bg-black/20',
					plan.highlighted && 'bg-[#A61F1F]/5',
				)}
			>
				<Button
					className={cn(
						"w-full h-12 rounded-lg font-['Inter'] text-sm font-bold tracking-widest uppercase transition-all duration-300",
						plan.highlighted ? "bg-[#F23030] hover:bg-[#A61F1F] text-white" : "bg-transparent border border-white/20 hover:bg-white/10 text-cream"
					)}
					asChild
				>
					<Link to={plan.btn.href}>{plan.btn.text}</Link>
				</Button>
			</div>
		</div>
	);
}

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  };

  return (
    <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
      <motion.div
        className={cn('absolute aspect-square bg-[#A61F1F]/50', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
