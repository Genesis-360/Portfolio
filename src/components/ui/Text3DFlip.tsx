"use client";

import React from "react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { animate, type AnimationOptions, type ValueAnimationTransition } from "framer-motion";

type RotateDirection = "top" | "right" | "bottom" | "left";
type StaggerFrom = "first" | "last" | "center" | number | "random";

const HAS_SEGMENTER = typeof Intl !== "undefined" && "Segmenter" in Intl;

const splitIntoCharacters = (text: string): string[] => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

const extractTextFromChildren = (children: ReactNode): string => {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join("");
  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>;
    const childText = props.children as ReactNode;
    if (childText != null) return extractTextFromChildren(childText);
  }
  return "";
};

const CONTAINER_TRANSFORMS: Record<RotateDirection, string> = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
};

const FRONT_FACE_TRANSFORMS: Record<RotateDirection, string> = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
};

const SECOND_FACE_TRANSFORMS: Record<RotateDirection, string> = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
};

const DEFAULT_TRANSITION: ValueAnimationTransition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
};

interface CharBoxProps {
  char: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection: RotateDirection;
}

const CharBox = memo(
  ({ char, textClassName, flipTextClassName, rotateDirection }: CharBoxProps) => (
    <span
      className="text-3d-char inline-block"
      style={{
        transformStyle: "preserve-3d",
        transform: CONTAINER_TRANSFORMS[rotateDirection],
      }}
    >
      <span
        className={`block h-[1lh] ${textClassName ?? ""}`}
        style={{
          transform: FRONT_FACE_TRANSFORMS[rotateDirection],
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {char}
      </span>
      <span
        className={`absolute top-0 left-0 block h-[1lh] ${flipTextClassName ?? ""}`}
        style={{
          transform: SECOND_FACE_TRANSFORMS[rotateDirection],
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {char}
      </span>
    </span>
  )
);
CharBox.displayName = "CharBox";

interface Text3DFlipProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: ValueAnimationTransition | AnimationOptions;
  rotateDirection?: RotateDirection;
}

export function Text3DFlip({
  children,
  as: ElementTag = "p",
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.04,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION,
  rotateDirection = "right",
  ...props
}: Text3DFlipProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children);
    } catch {
      return "";
    }
  }, [children]);

  const wordList = useMemo(() => {
    const parts = text.split(" ");
    return parts.map((word, i) => ({
      chars: splitIntoCharacters(word),
      needsSpace: i !== parts.length - 1,
    }));
  }, [text]);

  const totalChars = useMemo(
    () => wordList.reduce((sum, w) => sum + w.chars.length, 0),
    [wordList]
  );

  const getDelay = useCallback(
    (index: number) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        return Math.abs(Math.floor(Math.random() * totalChars) - index) * staggerDuration;
      }
      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return index * staggerDuration;
    },
    [staggerFrom, staggerDuration, totalChars]
  );

  const handleHoverStart = useCallback(async () => {
    if (!containerRef.current) return;

    const chars = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".text-3d-char")
    );
    if (chars.length === 0) return;

    const isVertical = rotateDirection === "top" || rotateDirection === "bottom";
    const axisKey = isVertical ? "rotateX" : "rotateY";
    const targetValue = rotateDirection === "bottom" || rotateDirection === "left" ? -90 : 90;

    try {
      // Flip
      await Promise.all(
        chars.map((char, i) =>
          animate(
            char,
            { [axisKey]: targetValue } as Record<string, number>,
            {
              ...transition,
              delay: getDelay(i),
            } as AnimationOptions
          )
        )
      );

      // Reset transform instantly
      chars.forEach((char) => {
        (char.style as CSSStyleDeclaration).transform = "";
      });
    } catch {
      // ignore
    }
  }, [rotateDirection, transition, getDelay]);

  return (
    <ElementTag
      className={`relative inline-flex flex-wrap ${className ?? ""}`}
      onMouseEnter={handleHoverStart}
      ref={containerRef as React.RefObject<HTMLElement>}
      {...(props as object)}
    >
      <span className="sr-only">{text}</span>
      {wordList.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.chars.map((char, ci) => (
            <CharBox
              key={`${wi}-${ci}`}
              char={char}
              textClassName={textClassName}
              flipTextClassName={flipTextClassName}
              rotateDirection={rotateDirection}
            />
          ))}
          {word.needsSpace && <span className="whitespace-pre"> </span>}
        </span>
      ))}
    </ElementTag>
  );
}

Text3DFlip.displayName = "Text3DFlip";
export default Text3DFlip;
