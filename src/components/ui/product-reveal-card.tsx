"use client"

import { motion, useReducedMotion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { ShoppingCart, Star, Heart, ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductRevealCardProps {
  name?: string
  price?: string
  originalPrice?: string
  image?: string
  description?: string
  rating?: number
  reviewCount?: number
  features?: string[]
  onAdd?: () => void
  onFavorite?: () => void
  onDiscoverMore?: () => void
  enableAnimations?: boolean
  className?: string
}

export function ProductRevealCard({
  name = "Premium Wireless Headphones",
  price,
  originalPrice,
  image = "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop", 
  description = "Experience studio-quality sound with advanced noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  rating,
  reviewCount,
  features,
  onAdd,
  onFavorite,
  onDiscoverMore,
  enableAnimations = true,
  className,
}: ProductRevealCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.()
  }

  const containerVariants = {
    rest: { 
      scale: 1,
      y: 0,
    },
    hover: shouldAnimate ? { 
      scale: 1.03, 
      y: -8,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8,
      }
    } : {},
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  const overlayVariants = {
    rest: { 
      y: "100%", 
      opacity: 0,
    },
    hover: { 
      y: "0%", 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const contentVariants = {
    rest: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    hover: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const buttonVariants_motion = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate ? { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    } : {},
    tap: shouldAnimate ? { scale: 0.95 } : {},
  }

  const favoriteVariants = {
    rest: { scale: 1, rotate: 0 },
    favorite: { 
      scale: [1, 1.3, 1], 
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  }

  return (
    <motion.div
      data-slot="product-reveal-card"
      initial="rest"
      whileHover="hover"
      animate={isOpen ? "hover" : "rest"}
      onClick={() => setIsOpen(!isOpen)}
      variants={containerVariants}
      className={cn(
        "relative w-full md:w-80 h-[450px] rounded-2xl border border-white/10 bg-zinc-900 text-white overflow-hidden",
        "shadow-2xl shadow-black/50 cursor-pointer group",
        className
      )}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          variants={imageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Interaction Elements Overlaid */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              {rating !== undefined && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-[10px] text-zinc-400">{rating}</span>
                </div>
              )}
              <motion.h3 
                className="text-2xl font-black leading-[0.9] tracking-[0.15em] uppercase"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h3>
              {(price || originalPrice) && (
                <div className="flex items-center gap-2 mt-1">
                  {price && <span className="text-xl font-bold text-[#F23030]">{price}</span>}
                </div>
              )}
            </div>

            {/* Interaction Indicator Arrow */}
            {!isOpen && (
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 border border-white/10 group-hover:bg-[#F23030] group-hover:border-[#F23030] transition-all duration-300">
                <ArrowUpRight className="w-6 h-6 text-[#F23030] group-hover:text-white transition-colors" />
              </div>
            )}
          </div>
        </div>

        {/* Discount Badge */}
        {originalPrice && price && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 bg-[#F23030] text-white px-3 py-1 rounded-full text-[10px] font-bold z-30"
          >
            {Math.round(((parseFloat(originalPrice.replace('$', '')) - parseFloat(price.replace('$', ''))) / parseFloat(originalPrice.replace('$', ''))) * 100)}% OFF
          </motion.div>
        )}
      </div>

      {/* Reveal Overlay */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col justify-end z-20"
      >
        <div className="p-8 space-y-6">
          {/* Product Description */}
          <motion.div variants={contentVariants}>
            <h4 className="font-semibold mb-3 text-[#F23030] uppercase text-xs tracking-[0.2em]">Our Expertise</h4>
            <p className="text-[15px] text-zinc-300 leading-relaxed font-medium">
              {description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={contentVariants} className="pt-2">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Discover More clicked");
                onDiscoverMore?.();
              }}
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "relative z-50 pointer-events-auto w-full h-12 font-bold uppercase tracking-[0.15em] text-xs border-white/20 text-white hover:bg-[#F23030] hover:border-[#F23030] transition-all duration-300 rounded-xl"
              )}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
